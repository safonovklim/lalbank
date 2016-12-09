class Client < ApplicationRecord
  has_many :bank_accounts

  enum status: [:not_approved, :activated, :banned]

  validates :last_name, presence: true
  validates :first_name, presence: true
  validates :middle_name, presence: true
  validates :birth_at, presence: true

end
