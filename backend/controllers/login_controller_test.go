package controllers

import (
	"net/http"
	"testing"
	"github.com/gin-gonic/gin"
	"gomoku/utils/testutils"
)

func TestLoginController_Login(t *testing.T) {

	tests := []testutils.TestCase{
		{
			Name: "Test case 1: Success",
			Request: testutils.Request{
				Method: http.MethodPost,
				Url:    "api/v1/users/login",
				Body: map[string]interface{}{
					"message": "Hello",
				},
			},
			Response: testutils.Response{
				Code: http.StatusOK,
				Body: map[string]interface{}{
					"message": "Login successful",
				},
			},
		},
		{
			Name: "Test case 2: Failed with empty",
			Request: testutils.Request{
				Method: http.MethodPost,
				Url:    "api/v1/users/login",
				Body:   map[string]interface{}{},
			},
			Response: testutils.Response{
				Code: http.StatusBadRequest,
				Body: map[string]interface{}{
					"error": "Key: 'LoginRequest.Message' Error:Field validation for 'Message' failed on the 'required' tag",
				},
			},
		},
		{
			Name: "Test case 3: Failed with number",
			Request: testutils.Request{
				Method: http.MethodPost,
				Url:    "api/v1/users/login",
				Body: map[string]interface{}{
					"message": 123,
				},
			},
			Response: testutils.Response{
				Code: http.StatusBadRequest,
				Body: map[string]interface{}{
					"error": "json: cannot unmarshal number into Go struct field LoginRequest.message of type string",
				},
			},
		},
	}

	testutils.RunControllerTest(t, tests, func() gin.HandlerFunc {
		return NewLoginController().Login
	})
}
