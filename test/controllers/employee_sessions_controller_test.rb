require 'test_helper'

class EmployeeSessionsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get employee_sessions_new_url
    assert_response :success
  end

  test "should get create" do
    get employee_sessions_create_url
    assert_response :success
  end

  test "should get destroy" do
    get employee_sessions_destroy_url
    assert_response :success
  end

end
