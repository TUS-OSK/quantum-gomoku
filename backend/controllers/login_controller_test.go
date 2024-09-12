package controllers

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

type testRequestBody struct {
	Message any `json:"message"`
}

type preferResponse struct {
	code int
	body map[string]interface{}
}

func TestLoginController_Login(t *testing.T) {

	tests := []struct {
		name    string
		request testRequestBody
		want    preferResponse
	}{
		{
			name: "Test case 1: Success",
			request: testRequestBody{
				Message: "Hello",
			},
			want: preferResponse{
				code: http.StatusOK,
				body: map[string]interface{}{
					"message": "Login successful",
				},
			},
		},
		{
			name:    "Test case 2: Failed with empty",
			request: testRequestBody{},
			want: preferResponse{
				code: http.StatusBadRequest,
				body: map[string]interface{}{
					"error": "Key: 'LoginRequest.Message' Error:Field validation for 'Message' failed on the 'required' tag",
				},
			},
		},
		{
			name: "Test case 3: Failed with number",
			request: testRequestBody{
				Message: 123,
			},
			want: preferResponse{
				code: http.StatusBadRequest,
				body: map[string]interface{}{
					"error": "json: cannot unmarshal number into Go struct field LoginRequest.message of type string",
				},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			response := httptest.NewRecorder()
			c, _ := gin.CreateTestContext(response)

			requestBody, _ := json.Marshal(tt.request)
			c.Request, _ = http.NewRequest(
				http.MethodPost,
				"api/v1/users/login",
				strings.NewReader(string(requestBody)),
			)

			c.Request.Header.Set("Content-Type", "application/json")

			NewLoginController().Login(c)

			if response.Code != tt.want.code {
				t.Errorf("Login() got = %v, want %v", response.Code, tt.want.code)
			} else {
				var body map[string]interface{}
				var err = json.Unmarshal(response.Body.Bytes(), &body)
				if err != nil {
					t.Errorf("Login() got = %v, want %v", response.Body, tt.want.body)
				}

				// to compare
				for key := range tt.want.body {
					if _, exist := body[key]; exist {
						if body[key] != tt.want.body[key] {
							t.Errorf("Login() got = %v, want %v", response.Body, tt.want.body)
						}
					} else {
						t.Errorf("Login() got = %v, want %v", response.Body, tt.want.body)
					}
				}
			}
		})
	}
}
