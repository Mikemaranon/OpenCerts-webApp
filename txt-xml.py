import xml.etree.ElementTree as ET

def convert_txt_to_xml(input_txt_file, output_xml_file):
    # Abrir y leer el archivo de texto
    with open(input_txt_file, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    
    # Crear el elemento raíz
    exam = ET.Element("exam")
    
    # Metadatos del examen
    meta = ET.SubElement(exam, "meta")
    ET.SubElement(meta, "number").text = "000-000"
    ET.SubElement(meta, "passing_score").text = "800"
    ET.SubElement(meta, "time_limit").text = "120 min"
    ET.SubElement(meta, "file_version").text = "1.0"
    
    # Contenedor de preguntas
    questions = ET.SubElement(exam, "questions")
    
    # Variables de control
    question_id = 1
    current_question = None
    
    # Procesar líneas del archivo
    for line in lines:
        line = line.strip()
        if line.startswith("QUESTION"):
            # Crear una nueva pregunta
            current_question = ET.SubElement(questions, "question", id=str(question_id), type="single-select", topic="1")
            question_id += 1
        elif current_question is not None:
            if line.startswith("Answer:"):
                # Respuesta
                ET.SubElement(current_question, "answer").text = line.split(":")[1].strip()
            elif line.startswith("."):
                # Opciones
                options = current_question.find("options")
                if options is None:
                    options = ET.SubElement(current_question, "options")
                ET.SubElement(options, "option").text = line[1:].strip()
            elif line:
                # Descripción
                desc = current_question.find("desc")
                if desc is None:
                    desc = ET.SubElement(current_question, "desc")
                desc.text = (desc.text or "") + " " + line if desc.text else line
    
    # Escribir el XML a un archivo
    tree = ET.ElementTree(exam)
    tree.write(output_xml_file, encoding="utf-8", xml_declaration=True)
    print(f"Archivo XML generado: {output_xml_file}")

# Uso del script
input_txt_file = "examen.txt"  # Cambia por el nombre de tu archivo de texto
output_xml_file = "examen.xml"
convert_txt_to_xml(input_txt_file, output_xml_file)
