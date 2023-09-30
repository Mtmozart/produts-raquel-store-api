import { IConversionDTO } from './IConversionDTO';
class Conversion {
  numberInter(data: IConversionDTO) {
    const number = parseInt(data.value);
    return number;
  }

  realNumbers(data: IConversionDTO) {
    const number = parseFloat(data.value);
    return number;
  }
}

export { Conversion };
