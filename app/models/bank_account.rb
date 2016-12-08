class BankAccount < ApplicationRecord
  belongs_to :client
  has_many :cards

  enum type: [:main, :additional]
end
