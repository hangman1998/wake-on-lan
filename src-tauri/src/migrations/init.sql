CREATE TABLE "machine" (
	"name"	TEXT,
	"mac"	TEXT NOT NULL UNIQUE,
	"address"	TEXT,
	PRIMARY KEY("name")
)