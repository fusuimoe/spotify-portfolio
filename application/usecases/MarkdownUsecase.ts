import { IMarkdownRepository } from '@/application/interfaces/IMarkdownRepository'
import { GetMarkdownContentInput } from '@/application/interfaces/inputs/GetMarkdownContentInput'
import { MarkdownContentJSON } from '@/application/interfaces/json/markdown/Content'

export class MarkdownUseCase {
  private repository: IMarkdownRepository

  constructor(repository: IMarkdownRepository) {
    this.repository = repository
  }

  async getMarkdownHTML(
    input: GetMarkdownContentInput
  ): Promise<string | null> {
    return await this.repository.getMarkdownHTML(input)
  }
}
