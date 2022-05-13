class CreateDogFeeds < ActiveRecord::Migration[6.1]
  def change
    create_table :dog_feeds do |t|
      t.boolean :pooped
      t.references :dog, foreign_key: true, null: false
      t.references :feed, foreign_key: true, null: false
    end
  end
end
