module Api::V1
  class EmployeeController < ApiController
    def create
      @employee = Employee.new(employee_params)
      if @employee.valid?
        @employee.save
        render json: {
            created: true
        }
      else
        render json: {
            :created => false,
            :errors => @employee.errors,
        }, :status => 400
      end
    end



    private
      def employee_params
        params.require(:employee).permit(:username, :password, :password_confirmation)
      end
  end
end
