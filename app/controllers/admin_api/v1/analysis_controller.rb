module AdminApi::V1
  class AnalysisController < ApiController
    before_action :authenticate_employee, only: [:index]
    before_action :set_client, only: [:index]

    def index
      year = period_parameters(:year).to_i
      month = period_parameters(:month).to_i

      proceed_allowed = false

      if month >= 1 && month <= 12
        if year >= @client[:created_at].year.to_i && year <= Time.now.year.to_i
          if @client[:created_at].year.to_i == Time.now.year.to_i
            # check for month
            if month >= @client[:created_at].month.to_i
              # proceed
              proceed_allowed = true
            end
          else
            # proceed
            proceed_allowed = true

          end
        end
      end

      if proceed_allowed == true
        info = Analysis
                   .select('analyses.year, analyses.month, tc.name as category, analyses.amount, analyses.currency')
                   .where(client_id: @client[:id])
                   .where(year: year)
                   .where(month: month)
                   .joins('INNER JOIN transaction_categories tc ON tc.id = analyses.transaction_category_id')
                   .order('amount ASC')

        render_result true, info
      else
        render_result
      end

    end

    private
      def period_parameters(period)
        params.require(period)
      end
      def render_result(allowed = false, analysis = nil)
        allowed_from = "#{@client[:created_at].year}-#{@client[:created_at].month}"
        allowed_to = "#{Time.now.year}-#{Time.now.month}"
        if allowed == true
          render json: {
              available: true,
              info: analysis,
              choosed_period: "#{period_parameters :year}-#{period_parameters :month}",
              allowed_range: {
                  from: allowed_from,
                  to: allowed_to
              }
          }
        else
          render json: {
              available: false,
              choosed_period: "#{period_parameters :year}-#{period_parameters :month}",
              allowed_range: {
                  from: allowed_from,
                  to: allowed_to
              }
          }, status: :bad_request
        end

      end
  end
end

