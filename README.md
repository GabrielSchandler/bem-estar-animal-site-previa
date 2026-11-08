# Pet Shop Bem Estar Animal — Prévia do site

Prévia do novo site do Pet Shop Bem Estar Animal: veterinária, banho e tosa, creche e hospedagem em Porto Belo/SC.
Preview of the new website for Pet Shop Bem Estar Animal, a vet clinic and pet shop (grooming, daycare and boarding) in Porto Belo, Brazil.

[🇧🇷 Português](#-português) · [🇺🇸 English](#-english)

---

## 🇧🇷 Português

### Sobre o projeto

Página única para o **Pet Shop Bem Estar Animal**, em Perequê, Porto Belo/SC. O site reúne a clínica veterinária (Cura Animalium) e os serviços do pet shop, com um tom acolhedor. Todas as chamadas levam ao **WhatsApp**.

> ℹ️ **Prévia de demonstração**, feita para apresentar ao cliente. Ainda não foi publicada. Contatos, avaliações e informações comerciais precisam ser confirmados com a empresa antes de ir ao ar. As fontes e pendências estão em `RESEARCH.md`.

**Seções da página:**
- **Abertura:** "O cuidado que eles merecem."
- **Para eles, cada gesto conta:** apresentação.
- **Serviços:** clínica veterinária, banho e tosa, creche e hospedagem.
- **Cuidado para cada jeito de ser** e **Vínculos que ficam**.
- **Avaliações** de clientes.
- **Contato e localização** em Perequê.

### Tecnologias

- HTML, CSS e JavaScript puro (sem build)
- [GSAP](https://gsap.com/) + ScrollTrigger para as animações
- [Lenis](https://lenis.darkroom.engineering/) para a rolagem suave

### Como ver localmente

Abra o `index.html` no navegador ou suba um servidor simples na pasta (recomendado, por causa das animações):

```bash
python -m http.server 8000   # http://localhost:8000
```

### Estrutura

```
index.html        página completa
styles.css        estilos
script.js         interações e animações
assets/           imagens, logos e bibliotecas
review/           capturas de tela da revisão
RESEARCH.md       pesquisa, fontes e pendências
```

---

## 🇺🇸 English

### About

A single-page site for **Pet Shop Bem Estar Animal**, in Perequê, Porto Belo, Santa Catarina. It brings together the vet clinic (Cura Animalium) and the pet shop services in a warm tone. Every call-to-action leads to **WhatsApp**.

> ℹ️ **Demo preview** built to pitch to the client. It hasn't been published yet. Contacts, reviews and business details must be confirmed with the company before going live. Sources and open items are in `RESEARCH.md`.

**Page sections:**
- **Hero:** "The care they deserve."
- **Every gesture counts:** introduction.
- **Services:** vet clinic, grooming, daycare and boarding.
- **Care for every personality** and **Bonds that last**.
- **Customer reviews.**
- **Contact and location** in Perequê.

### Tech stack

- Vanilla HTML, CSS and JavaScript (no build step)
- [GSAP](https://gsap.com/) + ScrollTrigger for animations
- [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling

### Viewing locally

Open `index.html` in a browser, or serve the folder (recommended, because of the animations):

```bash
python -m http.server 8000   # http://localhost:8000
```
