class CreateEmployeeTokens < ActiveRecord::Migration[5.0]
  def change
    create_table :employee_tokens do |t|
      t.integer :employee_id
      t.datetime :expire_at
      t.string :token

      t.timestamps
    end
    add_index :employee_tokens, :token, :unique => true
  end
end
