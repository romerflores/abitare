const userValidos="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function validateUpper(cad="")
{
    cad.forEach(c => {
        if(!(c<='Z' && c>='A'))return false;
    });
    return true;
}

export function validateNumbers(cad=""){
    cad.forEach(c => {
        if(!(c<='9' && c>='0'))return false;
    });
    return true;
}

export function validateNoSpace(cad="")
{
    return !cad.endsWith(" ")
}

export function validateLetterNumbers(cad=" ")
{
    for(let i=0;i<length(userValidos);i++)
    {
        if(userValidos.charAt(i)==cad.charAt(length(cad)-1))return true;
    }
    return false;
}

export function validatePlaca(cad="")
{
    return cad.length<=10 && (validateNoSpace(cad) || (validateNumbers(cad) || validateUpper(cad)));
}