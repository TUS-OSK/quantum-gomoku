package testutils

type HTTPRequest struct {
	Method string
	Url    string
	Body   interface{}
}

type HTTPResponse struct {
	Code int
	Body interface{}
}
