import { Gender, Closeness } from './Types';

export function genderLookup(GenderCode: Gender): string{
  switch(GenderCode){
    case 'M':
      return 'Cis Gender Male'
    case 'F':
      return 'Cis Gender Female'
    case 'N':
      return 'Non Binary'
    case 'NA':
      return 'Prefer Not To Say'
  }
}

export function closenessLookup (closenesscode: Closeness): string{
  switch (closenesscode){
    case 'friend':
      return 'Friends'
    case 'closefriend':
      return 'Close Friends'
    case 'bestfriend':
      return 'Best Friends'
  }
}
