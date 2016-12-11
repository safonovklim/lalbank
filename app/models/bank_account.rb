class BankAccount < ApplicationRecord
  belongs_to :client
  has_one :cards

  enum reason: [:for_card, :standard, :deposit]
end
