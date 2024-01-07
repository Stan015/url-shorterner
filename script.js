async function shortenUrl() {
    try {
        const longUrl = document.getElementById('longUrl').value;

        // Send the long URL to the server for shortening
        const response = await fetch('http://255.0.0.1:3000/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ longUrl }),
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById('shortUrl').innerText = `Short URL: ${window.location.origin}/${result.shortId}`;
        } else {
            console.error(`Error shortening URL: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error('An unexpected error occurred:', error);
    }
}
