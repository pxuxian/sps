package com.gail.sps.model;

public class Role extends BaseModel {
	private static final long serialVersionUID = -7636672191886797797L;

	private int id;
	private String name;

	public Role() {
	}

	public Role(int id) {
		this.id = id;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Role [id=" + id + ", name=" + name + "]";
	}

}
