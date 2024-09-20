package testutils

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
)

// ControllerTestCase represents a test case for a controller.
type ControllerTestCase struct {
	Name     string       // Name is the name of the test case.
	Request  HTTPRequest  // Request is the HTTP request to be tested.
	Response HTTPResponse // Response is the expected HTTP response.
}

// RunControllerTest is a helper function for testing controller functions in a Gin framework.
// It runs a series of test cases and compares the expected response with the actual response.
// The function takes the following parameters:
// - t: The testing.T object for reporting test failures.
// - tests: A slice of ControllerTestCase structs representing the test cases to run.
// - targetControllerHandler: A function that returns the controller handler function to be tested.
//
// Each test case in the tests slice should have the following fields:
// - Name: The name of the test case.
// - Request: A struct representing the HTTP request to be made.
//   - Method: The HTTP method of the request (e.g., "GET", "POST", etc.).
//   - Url: The URL of the request.
//   - Body: The request body as a JSON object.
//   - Query: A map of query parameters to be added to the URL.
//
// - Response: A struct representing the expected HTTP response.
//   - Code: The expected HTTP status code.
//   - Body: The expected response body as a JSON object.
//
// Example usage:
//
//	tests := []ControllerTestCase{
//		{
//			Name: "Test case 1",
//			Request: HTTPRequest{
//				Method: http.MethodGet,
//				Url:    "/api/v1/test",
//				Body:   nil,
//			},
//			Response: HTTPResponse{
//				Code: http.StatusOK,
//				Body: map[string]interface{}{
//					"message": "success",
//				},
//			},
//		},
//		// Add more test cases here...
//	}
//	RunControllerTest(t, tests, func() gin.HandlerFunc {
//		return NewTestController().TestFunction
//	})
func RunControllerTest(t *testing.T, tests []ControllerTestCase, targetController func() gin.HandlerFunc) {

	// Helper function to marshal the body as a JSON string.
	marshalBody := func(body interface{}) string {
		if body == nil {
			return ""
		}
		jsonBody, err := json.Marshal(body)
		if err != nil {
			t.Errorf("failed to marshal body: %v", err)
			return ""
		}
		return string(jsonBody)
	}

	for _, tt := range tests {
		t.Run(tt.Name, func(t *testing.T) {
			// Create a new Gin context for each test case.
			response := httptest.NewRecorder()
			c, _ := gin.CreateTestContext(response)

			// Set the request method, URL, and body.
			requestBody, err := json.Marshal(tt.Request.Body)
			if err != nil {
				t.Errorf("failed to marshal request body: %v", err)
			}

			// Parse the request URL and add query parameters.
			requestUrl, err := url.Parse(tt.Request.Url)
			if err != nil {
				t.Errorf("failed to parse url: %v", err)
			}

			parsedRequestQuery := requestUrl.Query()
			for key, value := range tt.Request.Query {
				parsedRequestQuery.Set(key, value)
			}
			requestUrl.RawQuery = parsedRequestQuery.Encode()

			// Create the request object.
			c.Request, err = http.NewRequest(
				tt.Request.Method,
				requestUrl.String(),
				strings.NewReader(string(requestBody)),
			)
			if err != nil {
				t.Errorf("failed to create request: %v", err)
			}
			c.Request.Header.Set("Content-Type", "application/json")

			// Call the target controller function.
			targetController()(c)

			// Check the response status code and body.
			if response.Code != tt.Response.Code {
				t.Errorf("got = %v, want %v", response.Code, tt.Response.Code)
			} else {
				// Unmarshal the response body.
				var body interface{}
				if err := json.Unmarshal(response.Body.Bytes(), &body); err != nil {
					t.Errorf("failed to unmarshal response body: %v", err)
				}

				// Marshal actual and expected body
				actualBody := marshalBody(body)
				expectedBody := marshalBody(tt.Response.Body)

				// compare body as string
				if actualBody != expectedBody {
					t.Errorf("got = %v, want %v", actualBody, expectedBody)
				}
			}
		})
	}
}
