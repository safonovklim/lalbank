module Api::V1
  class TransactionController < ApiController
    before_action :authenticate_client, only: [:index]

    def index
      list = BankAccount
              .select('t.id, t.amount, t.currency, ts.name as category, t.created_at')
              .where(client_id: @current_client[:id])
              .where('bank_accounts.transactions_success > 0')
              .where('t.status = 0')
              .joins('RIGHT OUTER JOIN transactions t ON t.bank_account_id = bank_accounts.id')
              .joins('LEFT OUTER JOIN transaction_categories ts ON ts.id = t.transaction_category_id')
              .order('t.created_at DESC')
              .page(page_num)
              .per_page(10)
      render json: {
          transactions: list,
          per_page: 10
      }
    end

    private
      def page_num
        params.require(:page)
      end

  end
end