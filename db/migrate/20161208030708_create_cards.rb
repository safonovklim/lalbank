class CreateCards < ActiveRecord::Migration[5.0]
  def change
    create_table :cards do |t|
      t.integer :bank_account_id
      t.string :number
      t.boolean :is_blocked, default: false
      t.boolean :is_hidden, default: false

      t.timestamps
    end
  end
end
