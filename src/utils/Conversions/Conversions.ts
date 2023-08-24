import { IConversionDTO } from './IConversionDTO';
class numbersTransform {
  numberInter(data: IConversionDTO) {
    const number = Number.isInteger(data.number);
    return number;
  }

  realNumbers(data: IConversionDTO) {
    const number = parseFloat(data.number);
    return number;
  }
}

export { numbersTransform };
