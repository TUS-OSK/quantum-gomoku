package testutils

// HTTPRequest represents an HTTP request.
type HTTPRequest struct {
	Method string
	Url    string
	Body   interface{}
}

// HTTPResponse represents an HTTP response.
type HTTPResponse struct {
	Code int
	Body interface{}
}
