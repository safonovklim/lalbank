require 'digest/sha1'

class Card < ApplicationRecord
  # before_create :generate_card_details
  # before_validation :log

  enum status: [:active, :blocked]

  belongs_to :bank_account
  validates :card_number, presence: true, uniqueness: true, length: { is: 16 }

  def generate_number(length = 16)
    chars = '0123456789'
    result = ''
    length.times { result << chars[rand(chars.size)] }
    result
  end

  def generate_card_details
    self.status = :active
    self.card_number = generate_number(16)
    self.expire_at = Date.today + 4.years
    self.expire_at.change(day: 1)
    self.generate_pin
  end

  def generate_pin
    pin = generate_number 4
    self.pin_hash = self.get_pin_hash pin
    pin
  end

  def get_pin_hash(pin, card_number = self.card_number)
    Digest::SHA1.hexdigest("SaLtHeRe/ChAnGeItLaTeR|#{pin}|#{card_number}")
  end

  def log
    logger.info self
  end
end
