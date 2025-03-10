#!/bin/sh
echo "getting schema in database...";
npx drizzle-kit pull

# Create backup directory structure if it doesn't exist
if [ ! -d migrations_bkp ]; then
	mkdir -p "migrations_bkp/old"
fi

# If backup directory exists, back up current migrations
if [ -d "migrations_bkp" ]; then
	echo "Moving old backups and making new backup..."
	# Move previous backups to old folder
	[ -n "$(ls -A migrations_bkp/*.sql 2>/dev/null)" ] && mv migrations_bkp/*.sql migrations_bkp/old/
	# Copy current migrations to backup
	[ -d "./migrations" ] && cp -rfv ./migrations/* ./migrations_bkp/
fi

# Remove current migrations and regenerate
npx drizzle-kit generate
npx drizzle-kit push

# Restart the development server
if pgrep -f "npm run dev" >/dev/null; then
	echo "Restarting development server..."
	pkill -f "npm run dev"
fi
npm run dev
