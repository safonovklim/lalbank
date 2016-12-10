# Preview all emails at http://localhost:3000/rails/mailers/employee_mailer
class EmployeeMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/employee_mailer/reset_password_email
  def reset_password_email
    EmployeeMailer.reset_password_email
  end

end
