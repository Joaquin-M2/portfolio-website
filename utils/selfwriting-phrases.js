export function promiseSingleTimeout(phrase, place, time, cancel) {
    if (!cancel) return;
    return new Promise(function(resolve) {
        setTimeout(() => {
            console.log('bla')
        place(prevState => [...prevState, phrase]);
        resolve()
        }, time)
    })
}

export function promiseTwoTimeouts(phrase, array, place, writingSpeed, speedOuterTimeout, cancel) {
    if (!cancel) return;
    return new Promise(function(resolve) {
        setTimeout(() => {
            //if (!cancel) return;
            phrase.forEach((character, index) => {
                //if (!cancel) return;
                setTimeout(() => {
                    console.log('ble')
                    //if (!cancel) {return clearTimeout(timeout)};
                    array.push(<span key={`${array}-${Math.random()}`}>{character}</span>);
            place(prevState => [...prevState, array[array.length - 1]]);
            if (array.length === phrase.length) {
              resolve()
            }
          }, writingSpeed * index)
        })
      }, speedOuterTimeout)
    })
}