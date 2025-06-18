import { supabaseAdmin } from './supabase';

/**
 * Sets up the necessary database tables in Supabase if they don't exist
 * This function uses the Supabase admin client with service role privileges
 */
export async function setupDatabase() {
  try {
    console.log('🔧 Setting up database tables...');
    
    // Check if the inner_pulse_entries table exists
    const { data: existingTables, error: tableCheckError } = await supabaseAdmin
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'inner_pulse_entries');
    
    if (tableCheckError) {
      console.error('Error checking if table exists:', tableCheckError);
      return false;
    }
    
    // If table doesn't exist, create it
    if (!existingTables || existingTables.length === 0) {
      console.log('Creating inner_pulse_entries table...');
      
      // Using Supabase's storage API to create the table
      // Since we can't execute raw SQL directly, we'll use the storage API
      const { error: createTableError } = await supabaseAdmin.rpc('create_inner_pulse_table', {});
      
      if (createTableError) {
        console.error('Failed to create table using RPC, attempting alternative method...');
        
        // Alternative method: Create table using the storage API
        const { error: createError } = await supabaseAdmin
          .from('inner_pulse_entries')
          .insert({
            id: '00000000-0000-0000-0000-000000000000', // Dummy record to force table creation
            emotional: 1,
            mental: 1,
            physical: 1,
            spiritual: 1,
            reflection: 'Table initialization',
            ai_response: 'Table initialization',
            created_at: new Date().toISOString()
          })
          .select();
        
        if (createError && !createError.message.includes('already exists')) {
          console.error('Error creating table:', createError);
          return false;
        }
        
        // If the table was created with our dummy record, delete it
        if (!createError) {
          await supabaseAdmin
            .from('inner_pulse_entries')
            .delete()
            .eq('id', '00000000-0000-0000-0000-000000000000');
        }
      }
      
      console.log('✅ inner_pulse_entries table is ready');
    } else {
      console.log('✅ inner_pulse_entries table already exists');
    }
    
    return true;
  } catch (error) {
    console.error('Unexpected error during database setup:', error);
    return false;
  }
}

// Export a function to be called from API routes or during app initialization
export default setupDatabase;
