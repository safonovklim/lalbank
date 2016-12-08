class Client < ApplicationRecord
  enum status: [:not_approved, :active, :banned]
  validates :last_name, presence: true
  validates :first_name, presence: true
  validates :middle_name, presence: true
end
