let list = document.querySelector('.pages__list');
let next = document.querySelector('#next');
let back = document.querySelector('#back');
let wrapOfPages = document.querySelector('.pages');
let emptyArray = [];
back.style.visibility = 'hidden';
window.onload = ()=> {
    list.addEventListener('click', (e) => {
        let targetLi = e.target;
        for (let i = 0; i < list.children.length; i++) {
            if (targetLi == list.children[i]) {
                list.children[i].classList.add('activeColor');
                emptyArray.splice(0,1);
                emptyArray.push(i);
            } else {
                list.children[i].classList.remove('activeColor');
            }
        }
    });
    next.addEventListener('click', () => {
        for (let i = 0; i < list.children.length; i++){
            if(list.children[i].classList.contains('activeColor')){
                list.children[i].classList.remove('activeColor');
                // если доходит до последней цифры, то убираем из видимости старые и создаем новые
                if(i+1 == list.children.length){

                    //это если доходит чисто до 3
                    // i = -1;
                    // делаем видимой кноку назад
                    back.style.visibility = 'visible';

                    //делаем цикл по старым страницам , чтобы скрыть их
                    for (let i = 0; i < list.children.length; i++){
                        list.children[i].style.display = 'none';
                    }

                    //вставляем новые странички
                    list.insertAdjacentHTML("beforeEnd", `<li>${i+2}</li><li>${i+3}</li><li>${i+4}</li>`);
                }
                emptyArray.splice(0,1);
                emptyArray.push(i+1);
                list.children[i+1].classList.add('activeColor');
                break;
            }
        }
    });
    back.addEventListener('click', () => {
        for (let i = 0; i < list.children.length; i++){
            if(list.children[i].classList.contains('activeColor')){
                list.children[i].classList.remove('activeColor');
                //если доходит до последней цифры, то убираем из виду старые и создаем новые

                if(i%3 == 0){
                    //идем в обратную сторону убираем новые страницы , а старые наоборот восстонавливаем
                    list.children[i].style.display = 'none';
                    list.children[i+1].style.display = 'none';
                    list.children[i+2].style.display = 'none';
                    list.children[i-1].style.display = 'block';
                    list.children[i-2].style.display = 'block';
                    list.children[i-3].style.display = 'block';
                }

                // если итерация равна 2 , то есть 3 странице
                if(i-1 <= 2){
                    back.style.visibility = 'hidden';

                    //делаем цикл по всем старницам и удаляем созданные страницы , делаем это для того , чтобы при нажатии на далее созадавались новые страницы, но начинаем удалять с 3 итерации
                    for (let iL = i-1; iL <= list.children.length+1; iL++){

                        // мы не сможем удалить оставщиеся старницы , если итерация превышает длинну оставшихся страниц, поэтому уменьшаем итерацию
                        if(iL>=list.children.length){
                            iL = iL -2;
                        }

                        // собственно условие при котором удаляются страницы
                        if(iL > 2) {
                            list.children[iL].remove();
                        }

                        //делаем выход из цикла (все услвоия подобранны из опытов)
                        if(iL == 3 && list.children.length+1 == 4){
                            break;
                        }
                    }
                }
                emptyArray.splice(0,1);
                emptyArray.push(i-1);
                list.children[i-1].classList.add('activeColor');
                break;
            }
        }
    })
};