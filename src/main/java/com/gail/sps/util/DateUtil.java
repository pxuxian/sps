package com.gail.sps.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {

	public static final String FMT_DEFAULT = "yyyy-MM-dd HH:mm:ss";
	public static final String FMT_YYYY_MM_DD = "yyyy-MM-dd";
	public static final String FMT_YYYYMMDD = "yyyyMMdd";
	public static final String FMT_yyyyMMddHHmmss = "yyyyMMddHHmmss";

	private static final SimpleDateFormat format1 = new SimpleDateFormat(FMT_DEFAULT);
	private static final SimpleDateFormat format2 = new SimpleDateFormat(FMT_YYYY_MM_DD);
	private static final SimpleDateFormat format3 = new SimpleDateFormat(FMT_YYYYMMDD);
	private static final SimpleDateFormat format4 = new SimpleDateFormat(FMT_yyyyMMddHHmmss);

	public static String getFormatStr(Date date, String fmt) {
		SimpleDateFormat format = new SimpleDateFormat(fmt);
		return format.format(date);
	}

	/**
	 * yyyy-MM-dd HH:mm:ss
	 */
	public static String getDefaultFormatStr(Date date) {
		return format1.format(date);
	}

	/**
	 * yyyy-MM-dd
	 */
	public static String getFormatStr(Date date) {
		return format2.format(date);
	}
	
	/**
	 * yyyyMMddHHmmss
	 */
	public static String getFormatStr4(Date date) {
		return format4.format(date);
	}

	/**
	 * yyyy-MM-dd HH:mm:ss
	 */
	public static Date parse1(String source) {
		try {
			return format1.parse(source);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * yyyy-MM-dd
	 */
	public static Date parse2(String source) {
		try {
			return format2.parse(source);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * yyyyMMdd
	 */
	public static Date parse3(String source) {
		try {
			return format3.parse(source);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static Date getNextHour(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MINUTE, 60);
		return cal.getTime();
	}
	
	public static Date getNextDate(Date date) {
		Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, 1);
        return calendar.getTime();
	}

}
