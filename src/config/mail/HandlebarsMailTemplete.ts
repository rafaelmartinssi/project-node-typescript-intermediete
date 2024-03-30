import handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParseMailTemplete {
  file: string;
  variables: ITemplateVariables;
}

class HandlebarsMailTemplete {
  public async parse({ file, variables }: IParseMailTemplete): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    console.log('Chegou aqui template');
    const parseTemplate = handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplete;
