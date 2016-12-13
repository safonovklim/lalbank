module Api::V1
  class CardController < ApiController
    before_action :authenticate_client, only: [:index]

    def index
      cards = BankAccount.select("cards.id, cards.card_number, bank_accounts.amount, bank_accounts.currency").where('bank_accounts.client_id = ?', @current_client[:id]).where('cards.status = 0').joins("INNER JOIN cards ON cards.bank_account_id = bank_accounts.id")
      render json: cards
    end
  end
end