class BankAccount < ApplicationRecord
  belongs_to :client
  has_one :card
  has_many :transactions

  enum reason: [:for_card, :standard, :deposit]
end
