fetch('http://localhost:3000/films', {headers: {'api_key': 'azerty'}})
.then(re => re.json())
.then(data => {
    const liste = document.getElementById('liste');
    data.forEach(film => {
        const li = document.createElement('li');
        li.textContent = film.titre + " (" + film.date + ") - " + film.description ;
        liste.appendChild(document.createElement('br'));
        liste.appendChild(li);
    });
})
.catch(error => {
    console.error("Erreur");
});