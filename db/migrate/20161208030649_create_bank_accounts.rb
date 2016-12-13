class CreateBankAccounts < ActiveRecord::Migration[5.0]
  def change
    create_table :bank_accounts do |t|
      t.integer :client_id
      t.string :currency
      t.decimal :amount, default: 0
      t.integer :reason
      t.integer :transactions_success, default: 0
      t.integer :transactions_failed, default: 0
      t.boolean :is_blocked, default: false
      t.boolean :is_hidden, default: false

      t.timestamps
    end
  end
end
