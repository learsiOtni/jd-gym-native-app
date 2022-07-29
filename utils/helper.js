export const formatDate = date => {
    //Give date hyphen 20200511
    if (date.charAt(4) !== '-') {
        let year = date.substring(0, 4);
        let month = date.substring(4,6);
        let day = date.substring(6);
        date = `${year}-${month}-${day}`;
    }
    let tempDate = new Date(date);
    let options = { weekday: 'long', day: 'numeric', month: 'long' };
    return tempDate.toLocaleDateString(undefined, options);
};

export const createDays = (date) => {
    let day = date.substring(6);
    let tempArray = [];
    //Dynamically create the day
    let counter = 3;
    for (let i=0; i < 7; i++) {
        let value = day - counter;
        tempArray[i] = ('0' + value).slice(-2); //Adds 0 and chops third digit if any so 09 010 = 09 10
        counter -= 1;
    }
    return tempArray;
};

export const fetchGymClasses = (db, classesIds) => {
    let gymClasses = [];
    classesIds && classesIds.map(([className, isTrue], index) => {
        db.ref('/classes/' + className).on('value', snapshot => {
            if (isTrue) {
                gymClasses[index] = snapshot.val();
            }
            //Once reached the end of list, set Database
            if (classesIds.length === index + 1) {
                return gymClasses;
            }
        });
    });
};