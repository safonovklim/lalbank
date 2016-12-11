class BankAccount < ApplicationRecord
  belongs_to :client
  has_one :cards
  has_many :transactions

  enum reason: [:for_card, :standard, :deposit]
end
