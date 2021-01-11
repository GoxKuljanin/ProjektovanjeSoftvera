package com.klinickiCentar.klinika.exception;

public class ResourseConflictException extends RuntimeException {

	private Long resourceId;
	
	public ResourseConflictException(Long resourceId, String message) {
		super(message);
		this.setResourceId(resourceId);
	}
	public Long getResourceId() {
		return resourceId;
	}

	public void setResourceId(Long resourceId) {
		this.resourceId = resourceId;
	}
}
