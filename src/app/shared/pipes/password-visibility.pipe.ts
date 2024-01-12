import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordVisibility',
})
export class PasswordVisibilityPipe implements PipeTransform {
  transform(type: string, isText: boolean, eyeIcon: string): [string, boolean, string] {
    isText = !isText;
    eyeIcon = isText ? 'bi-eye' : 'bi-eye-slash';
    type = isText ? 'text' : 'password';

    return [type, isText, eyeIcon];
  }
}
