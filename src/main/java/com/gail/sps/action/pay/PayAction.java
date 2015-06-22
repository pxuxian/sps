package com.gail.sps.action.pay;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;

import com.allinpay.ets.client.PaymentResult;
import com.gail.sps.action.BaseAction;
import com.gail.sps.model.PayRequet;
import com.gail.sps.service.OrderService;
import com.gail.sps.service.PayService;

@Scope("prototype")
@ParentPackage("basePackage")
@Namespace("/")
@Result(name = "error", location = "/error.jsp" )
public class PayAction extends BaseAction {
	HttpServletResponse response = ServletActionContext.getResponse();

//	private String orderNo;
//	private boolean paySuccess;
	private PaymentResult paymentResult;
	
	@Autowired
	private PayService payService;
	@Autowired
	private OrderService orderService;

	@Action(value = "toPay")
	public String toPay() {
		try {
			String payUrl = payService.getPayUrl(id);
			response.sendRedirect(payUrl);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@Action(value = "pay", results = { @Result(name = "success", location = "/success.jsp") })
	public String pay() {
		try {
			//signType为"1"时，必须设置证书路径。
			String certPath = PayRequet.class.getResource("/TLCert-test.cer").getPath();
			paymentResult.setCertPath(certPath);

			//验证签名：返回true代表验签成功；否则验签失败。
			boolean verifyResult = paymentResult.verify();

			//验签成功，还需要判断订单状态，为"1"表示支付成功。
			boolean paySuccess = verifyResult && paymentResult.getPayResult().equals("1");
			if (paySuccess) {
				orderService.paySuccess(paymentResult.getOrderNo());
				this.msg = "订单支付成功！";
			} else {
				return ERROR;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ERROR;
		}
		return SUCCESS;
	}
	
	public PaymentResult getPaymentResult() {
		return paymentResult;
	}

	public void setPaymentResult(PaymentResult paymentResult) {
		this.paymentResult = paymentResult;
	}

}
