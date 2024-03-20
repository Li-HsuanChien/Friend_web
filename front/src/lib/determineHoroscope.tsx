export function determineHoroscope(show: boolean, birthdate: string): string{
  if(show){
    const birthArr = birthdate.split('-');
    switch(birthArr[1]){
      case('01'):
        if(Number(birthArr[2]) >= 20){
          return '♒'
        } else{
          return '♑'
        }
      case('02'):
        if(Number(birthArr[2]) >= 19){
          return '♓'
        } else{
          return '♒'
        }
      case('03'):
        if(Number(birthArr[2]) >= 21){
          return '♈'
        } else{
          return '♓'
        }
      case('04'):
        if(Number(birthArr[2]) >= 20){
          return '♉'
        } else{
          return '♈'
        }
      case('05'):
        if(Number(birthArr[2]) >= 21){
          return '♊'
        } else{
          return '♉'
        }
      case('06'):
        if(Number(birthArr[2]) >= 22){
          return '♋'
        } else{
          return '♊'
        }
      case('07'):
        if(Number(birthArr[2]) >= 23){
          return '♌'
        } else{
          return '♋'
        }
      case('08'):
          if(Number(birthArr[2]) >= 23){
            return '♍'
          } else{
            return '♌'
          }
      case('09'):
        if(Number(birthArr[2]) >= 23){
          return '♎'
        } else{
          return '♍'
        }
      case('10'):
        if(Number(birthArr[2]) >= 24){
          return '♏'
        } else{
          return '♎'
        }
      case('11'):
        if(Number(birthArr[2]) >= 22){
          return '♐'
        } else{
          return '♏'
        }
      case('12'):
        if(Number(birthArr[2]) >= 22){
          return '♑'
        } else{
          return '♐'
        }
    }
  }
  return '';
}
