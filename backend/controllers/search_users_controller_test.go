package controllers

import (
	"net/http"
	"testing"

	"github.com/gin-gonic/gin"

	"gomoku/utils/testutils"
)

func TestSearchUsersController_SearchUsers(t *testing.T) {

	tests := []testutils.ControllerTestCase{
		{
			Name: "Test case 1: Success with OSK (single user)",
			Request: testutils.HTTPRequest{
				Query: map[string]string{
					"username": "OSK",
				},
			},
			Response: testutils.HTTPResponse{
				Code: http.StatusOK,
				Body: map[string]interface{}{
					"users": []interface{}{
						map[string]interface{}{
							"username": "OSK",
							"icon":     "https://oskt.us/favicon.ico",
						},
					},
				},
			},
		},
		{
			Name: "Test case 2: Success with O (multiple user)",
			Request: testutils.HTTPRequest{
				Query: map[string]string{
					"username": "O",
				},
			},
			Response: testutils.HTTPResponse{
				Code: http.StatusOK,
				Body: map[string]interface{}{
					"users": []interface{}{
						map[string]interface{}{
							"username": "O",
							"icon":     "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Latin_letter_O.svg/1920px-Latin_letter_O.svg.png",
						},
						map[string]interface{}{
							"username": "OSK",
							"icon":     "https://oskt.us/favicon.ico",
						},
						map[string]interface{}{
							"username": "OSS",
							"icon":     "",
						},
					},
				},
			},
		},
		{
			Name: "Test case 3: Failed with empty",
			Request: testutils.HTTPRequest{
				Query: map[string]string{
					"username": "",
				},
			},
			Response: testutils.HTTPResponse{
				Code: http.StatusBadRequest,
				Body: map[string]interface{}{
					"error": "query parameter 'username' is required",
				},
			},
		},
	}

	testutils.RunControllerTest(t, tests, func() gin.HandlerFunc {
		return NewSearchUsersController().SearchUsers
	})
}
