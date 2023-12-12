self.onmessage = function(event) {
    var iterations = event.data;

    self.onerror = function (error) {
        console.error('Error in worker:', error.message);
        //self.postMessage({ error: error.message });
        window.alert('Error in worker: ' + error.message);
        self.close();
    };

    var primes = [];
    try {
        for (var i = 0; i < iterations; i++) {
            var candidate = i * (1000000000 * Math.random());
            var isPrime = true;
            for (var c = 2; c <= Math.sqrt(candidate); ++c) {
                if (candidate % c === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                primes.push(candidate);
            }
        }
        self.postMessage(primes);
    } catch (error) {   
        // blad w obliczeniach
        console.error('Error in worker:', error.message);
        //self.postMessage({ error: error.message });
        window.alert('Error in worker: ' + error.message);
    } finally {
        // zakonczenie watku, blok finally sie zawsze wykona niezaleznie od erroru lub jego jego braku
        self.close();
    }
};