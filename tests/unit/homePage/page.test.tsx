import { render } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import HomePage from "@/app/page";


describe("Testando HomePage", ()=> {

    test("Se axiste botão clique aqui na tela.", ()=> {
        const page = render(<HomePage />);
    
        const button = page.getByRole("button", {name: /clique aqui/i});
    
        expect(button).toBeInTheDocument();
    })

    test("Se o botão esta disparando.", async ()=> {

        const user = userEvent.setup()

        const consoleSpy = vi
      .spyOn(console, 'log')
      .mockImplementation(() => {})

        const page = render(<HomePage />);
    
        const button = page.getByRole("button", {name: /clique aqui/i});
        
        await user.click(button)

        expect(consoleSpy)
      .toHaveBeenCalledWith('Olá, Mundo!!')

        consoleSpy.mockRestore()


    })
})