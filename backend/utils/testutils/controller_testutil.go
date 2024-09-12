package testutils

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
)

type ControllerTestCase struct {
	Name     string
	Request  HTTPRequest
	Response HTTPResponse
}

func RunControllerTest(t *testing.T, tests []ControllerTestCase, targetControllerFunction func() gin.HandlerFunc) {
	for _, tt := range tests {
		t.Run(tt.Name, func(t *testing.T) {
			response := httptest.NewRecorder()
			c, _ := gin.CreateTestContext(response)

			requestBody, _ := json.Marshal(tt.Request.Body)
			c.Request, _ = http.NewRequest(
				tt.Request.Method,
				tt.Request.Url,
				strings.NewReader(string(requestBody)),
			)

			c.Request.Header.Set("Content-Type", "application/json")

			targetControllerFunction()(c)

			if response.Code != tt.Response.Code {
				t.Errorf("got = %v, want %v", response.Code, tt.Response.Code)
			} else {
				var body interface{}
				var err = json.Unmarshal(response.Body.Bytes(), &body)
				if err != nil {
					t.Errorf("got = %v, want %v", response.Body, tt.Response.Body)
				}

				// to compare
				expectedBody, _ := json.Marshal(tt.Response.Body)
				actualBody, _ := json.Marshal(body)
				if string(expectedBody) != string(actualBody) {
					t.Errorf("got = %v, want %v", string(actualBody), string(expectedBody))
				}
			}
		})
	}
}
