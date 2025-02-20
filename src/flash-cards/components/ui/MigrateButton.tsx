import { migrateDecks } from '@/flash-cards/infrastructure/migrate';

export default function MigrationButton() {
  const handleMigration = async () => {
    try {
      await migrateDecks();
      alert('Migration completed!');
    } catch (error) {
      console.error('Migration failed:', error);
    }
  };

  return <button onClick={handleMigration}>Run Migration</button>;
}
