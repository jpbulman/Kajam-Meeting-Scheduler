package com.amazonaws.lambda.demo;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

import org.junit.Assert;
import org.junit.Test;

import com.amazonaws.services.lambda.runtime.Context;

import db.ScheduleDAO;
import model.Schedule;

public class RetrieveOldScheduleTest {


	private static final String SAMPLE_INPUT_STRING = "{\n" +
    		"    \"arg1\": \"3\"" + "}";
    
    Context createContext(String apiCall) {
        TestContext ctx = new TestContext();
        ctx.setFunctionName(apiCall);
        return ctx;
    }
    
    //Tests getSchedule with invalid id
    @Test
    public void RetrieveNewSchedulevalidID() throws IOException {
    	RetrieveNewScheduleHandler handler = new RetrieveNewScheduleHandler();
    	
		UUID id1 = UUID.fromString("eea5770b-84ac-446f-bfdc-442f26fb2211");
       
        ScheduleDAO dao = new ScheduleDAO();
        
		try {
			dao.addSchedule(s);
		} catch (Exception e) {
			e.printStackTrace();
		}
    	
        InputStream input = new ByteArrayInputStream(SAMPLE_INPUT_STRING.getBytes());;
        OutputStream output = new ByteArrayOutputStream();
        
		String sampleOutputString = output.toString();
        handler.handleRequest(input, output, createContext("sample2"));
        Assert.assertTrue(sampleOutputString.contains("httpCode\\\":200"));
		
		try {
			dao.deleteSchedule(dao.getSchedule(id1));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
}