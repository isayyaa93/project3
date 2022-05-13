# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_05_11_181857) do

  create_table "dog_feeds", force: :cascade do |t|
    t.boolean "pooped"
    t.integer "dog_id", null: false
    t.integer "feed_id", null: false
    t.index ["dog_id"], name: "index_dog_feeds_on_dog_id"
    t.index ["feed_id"], name: "index_dog_feeds_on_feed_id"
  end

  create_table "dogs", force: :cascade do |t|
    t.string "name"
    t.date "birthdate"
    t.string "breed"
    t.string "image_url"
  end

  create_table "feeds", force: :cascade do |t|
    t.datetime "time"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "dog_feeds", "dogs"
  add_foreign_key "dog_feeds", "feeds"
end
