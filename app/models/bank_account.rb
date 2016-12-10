class BankAccount < ApplicationRecord
  belongs_to :client
  has_one :cards

  enum type: [:for_card, :standard, :deposit]
end
