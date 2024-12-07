import xml.etree.ElementTree as ET
import json

def load_tags(tags_file):
    """Carga la lista de etiquetas desde un archivo JSON."""
    with open(tags_file, "r", encoding="utf-8") as f:
        return json.load(f)

def detect_tags(question_content, predefined_tags):
    """Detecta etiquetas en el contenido de la pregunta."""
    tags_found = set()
    for tag in predefined_tags:
        if tag.lower() in question_content.lower():
            tags_found.add(tag)
    return list(tags_found)

def vce_to_json(xml_file, tags_file, output_json, exam_name):
    # Cargar etiquetas predefinidas
    predefined_tags = load_tags(tags_file)
    
    # Leer el archivo XML
    tree = ET.parse(xml_file)
    root = tree.getroot()

    questions = []
    global_id = 1

    # Iterar sobre las preguntas en el XML
    for topic_idx, topic in enumerate(root.findall("topic")):
        topic_id = topic_idx + 1
        for question_idx, question in enumerate(topic.findall("question")):
            # Crear la estructura de la pregunta
            question_data = {
                "id": global_id,
                "topic": topic_id,
                "type": question.get("type"),  # Asume que el tipo está en un atributo
                "question": {},
                "options": [],
                "tags": []
            }

            # Procesar los elementos de la pregunta
            content_accumulator = []  # Acumula contenido para detección de etiquetas
            for elem in question:
                if elem.tag.startswith("desc"):
                    question_data["question"][elem.tag] = elem.text
                    content_accumulator.append(elem.text or "")
                elif elem.tag.startswith("img"):
                    question_data["question"][elem.tag] = f"../../Answers/{exam_name}/T{topic_id}P{global_id}.png"
                elif elem.tag in ["u_list", "o_list"]:
                    list_items = [li.text for li in elem.findall("li")]
                    question_data["question"][elem.tag] = list_items
                    content_accumulator.extend(list_items)
                elif elem.tag.startswith("code"):
                    question_data["question"][elem.tag] = elem.text
                    content_accumulator.append(elem.text or "")

            # Procesar las opciones
            options = []
            for option in question.findall("option"):
                options.append(option.text)
            question_data["options"] = options
            content_accumulator.extend(options)

            # Detectar etiquetas en el contenido acumulado
            full_content = " ".join(content_accumulator)
            question_data["tags"] = detect_tags(full_content, predefined_tags)

            # Añadir pregunta a la lista y aumentar el ID global
            questions.append(question_data)
            global_id += 1

    # Guardar el JSON
    with open(output_json, "w", encoding="utf-8") as f:
        json.dump(questions, f, indent=4, ensure_ascii=False)

    print(f"Archivo JSON generado: {output_json}")

# Uso del script
xml_file = "examen.xml"  # Cambia por tu archivo XML
tags_file = "tags.json"  # Cambia por tu archivo de etiquetas
output_json = "examen.json"
exam_name = "nombreExamen"
vce_to_json(xml_file, tags_file, output_json, exam_name)