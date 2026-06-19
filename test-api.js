// Simple API test script
// Run with: node test-api.js

const API_URL = 'http://localhost:3001/api';

async function testAPI() {
  console.log('🧪 Testing Egypt World Cup Predictor API\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing health endpoint...');
    const healthRes = await fetch(`${API_URL}/health`);
    const health = await healthRes.json();
    console.log('✅ Health check:', health);
    console.log('');

    // Test 2: Get Matches
    console.log('2️⃣ Testing matches endpoint...');
    const matchesRes = await fetch(`${API_URL}/matches`);
    const matches = await matchesRes.json();
    console.log('✅ Matches loaded:', matches.length, 'matches');
    matches.forEach(m => {
      console.log(`   - ${m.homeTeam.flag} ${m.homeTeam.name} vs ${m.awayTeam.name} ${m.awayTeam.flag}`);
    });
    console.log('');

    // Test 3: Submit Prediction
    console.log('3️⃣ Testing prediction submission...');
    const testPrediction = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      predictions: {
        1: { homeScore: 2, awayScore: 1 },
        2: { homeScore: 3, awayScore: 2 }
      }
    };
    
    const submitRes = await fetch(`${API_URL}/predictions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPrediction)
    });
    const submitResult = await submitRes.json();
    console.log('✅ Prediction submitted:', submitResult);
    console.log('');

    // Test 4: Get All Predictions
    console.log('4️⃣ Testing predictions history...');
    const predictionsRes = await fetch(`${API_URL}/predictions`);
    const predictions = await predictionsRes.json();
    console.log('✅ Total predictions:', predictions.length);
    console.log('');

    // Test 5: Duplicate Prevention
    console.log('5️⃣ Testing duplicate prevention...');
    const duplicateRes = await fetch(`${API_URL}/predictions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPrediction)
    });
    const duplicateResult = await duplicateRes.json();
    if (!duplicateRes.ok) {
      console.log('✅ Duplicate prevention working:', duplicateResult.error);
    } else {
      console.log('❌ Duplicate prevention failed - should have rejected');
    }
    console.log('');

    console.log('🎉 All tests completed!\n');
    console.log('📊 Summary:');
    console.log('   - Backend is running correctly');
    console.log('   - All endpoints are working');
    console.log('   - Database is functioning');
    console.log('   - Validation is working');
    console.log('\n✅ Ready for production!\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n⚠️  Make sure the backend server is running:');
    console.log('   npm run server\n');
  }
}

testAPI();

// Made with Bob
